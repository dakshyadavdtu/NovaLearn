// Stubs – full impl in next commit
export async function signup(req, res) {
  res.status(501).json({ message: 'signup' });
}

export async function login(req, res) {
  res.status(501).json({ message: 'login' });
}

export async function logout(req, res) {
  res.json({ ok: true });
}
