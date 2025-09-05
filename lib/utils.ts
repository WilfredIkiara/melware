export const formatISODate = (iso: string) => new Date(iso).toISOString().slice(0, 10)

export const toCSV = (rows: Record<string, any>[]) => {
  if (!rows.length) return ''
  const headers = Object.keys(rows[0])
  const escape = (v: any) => `"${String(v ?? '').replace(/"/g, '""')}"`
  return [headers.join(','), ...rows.map(r => headers.map(h => escape(r[h])).join(','))].join('\n')
}
