import { handle } from '../../../lib/api';
import { endSession } from '../../../lib/auth';

export default handle(['POST'], (req, res) => {
  endSession(res);
  return res.status(200).json({ ok: true });
});
