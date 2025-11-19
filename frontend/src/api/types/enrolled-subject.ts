/**
 * Type for enrolled subjects that includes progress information
 */
import { Subject } from './subject';

export interface EnrolledSubject extends Subject {
  /** Progress percentage for the subject */
  progress: number;
  /** Name of the subject (alias for title) */
  name: string;
}