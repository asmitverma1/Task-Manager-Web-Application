import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user?: { _id: string }; // Define the structure of the user property
}
