import { validateTime } from './validateTime';

describe('validateTime', () => {
  it('should return true if time is valid', () => {
    const validTimes = ['07:00', '00:00', '14:05', '20:30', '11:31', '09:25'];

    validTimes.map((time) => {
      const result = validateTime(time);
      expect(result).toBe(true);
    });
  });

  it('should return false if time is invalid', () => {
    const invalidTimes = [
      '$7:00',
      '0 :00',
      '24:00',
      '25:00',
      '99:00',
      '11;30',
      '11-30',
      '9-5',
      '11: 5',
      '11:5 ',
      '11:60',
      '11:99',
    ];

    invalidTimes.map((time) => {
      const result = validateTime(time);
      expect(result).toBe(false);
    });
  });
});
