const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../db');

// This function retrieves all users, but the permission check
// is still based on the role of the requesting user.
exports.getAllUsers = async (req, res) => {
  try {
    // Only admin and superadmin can view all users
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions to view users'
      });
    }

    const { data: users, error } = await supabase
      .from('users')
      .select('id, name, email, role, created_at, updated_at')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// This function is now updated to fetch a user by their email
// from the request parameters.
exports.getUserByEmail = async (req, res) => {
  try {
    const userEmail = req.params.email;

    // Users can view their own profile, and admins/superadmins can view any profile
    if (req.user.email !== userEmail && req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions to view this user'
      });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, role, created_at, updated_at')
      .eq('email', userEmail)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      throw error;
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// This function now uses the user's email from the request body
// to identify and update the user record.
exports.updateUser = async (req, res) => {
  try {
    const { email, name, role, currentPassword, newPassword } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required to find the user to be updated'
      });
    }

    // Get current user data using email
    const { data: currentUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (fetchError || !currentUser) {
      return res.status(404).json({ success: false, message: 'User with this email not found' });
    }

    // Check permissions: A superadmin can update any user.
    // An admin can update other users except superadmins.
    // Any user can update their own account.
    const canUpdateOtherUsers = (req.user.role === 'superadmin' || (req.user.role === 'admin' && currentUser.role !== 'superadmin'));
    const isUpdatingSelf = (req.user.email === email);
    const canChangeRole = (req.user.role === 'superadmin');

    if (!isUpdatingSelf && !canUpdateOtherUsers) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions to update this user'
      });
    }

    if (role && !canChangeRole) {
      return res.status(403).json({
        success: false,
        message: 'Only superadmin can change a user\'s role'
      });
    }

    // Prepare update data
    const updateData = { updated_at: new Date() };
    if (name) updateData.name = name;
    if (role) updateData.role = role;

    // Handle password change if requested
    if (newPassword) {
      // If the user is updating themselves, the current password is required.
      // If a superadmin is updating another user, the current password is not required.
      if (isUpdatingSelf) {
        if (!currentPassword) {
          return res.status(400).json({
            success: false,
            message: 'Current password is required to change password'
          });
        }
        const isValidPassword = await bcrypt.compare(currentPassword, currentUser.password);
        if (!isValidPassword) {
          return res.status(400).json({
            success: false,
            message: 'Current password is incorrect'
          });
        }
      }

      const saltRounds = 10;
      updateData.password = await bcrypt.hash(newPassword, saltRounds);
    }

    // Update user using email
    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update(updateData)
      .eq('email', email)
      .select('id, name, email, role, created_at, updated_at')
      .single();

    if (updateError) throw updateError;

    res.json({
      success: true,
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// This function now uses the user's email from the request
// parameters to identify and delete the user.
exports.deleteUser = async (req, res) => {
  try {
    const userEmail = req.params.email;

    // Only superadmin can delete users
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions to delete users'
      });
    }

    // Prevent self-deletion
    if (req.user.email === userEmail) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete your own account'
      });
    }

    const { data: deletedUser, error } = await supabase
      .from('users')
      .delete()
      .eq('email', userEmail)
      .select('id, name, email')
      .single();

    if (error) throw error;

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      message: 'User deleted successfully',
      user: deletedUser
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
