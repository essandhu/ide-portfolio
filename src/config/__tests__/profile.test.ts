import { profile } from '../profile';

describe('profile config', () => {
  it('exports a profile with required fields', () => {
    expect(profile.name).toBeDefined();
    expect(profile.location).toBeDefined();
    expect(profile.title).toBeDefined();
    expect(profile.bio).toBeDefined();
    expect(profile.interests).toBeInstanceOf(Array);
    expect(profile.contact.email).toBeDefined();
    expect(profile.contact.github).toBeDefined();
    expect(profile.contact.linkedin).toBeDefined();
    expect(profile.contact.website).toBeDefined();
    expect(profile.skills.length).toBeGreaterThan(0);
    expect(profile.experience).toBeInstanceOf(Array);
    expect(profile.experience.length).toBeGreaterThan(0);
    expect(profile.experience[0].company).toBeDefined();
    expect(profile.projects.length).toBeGreaterThan(0);
  });

  it('has proficiency as a number 1-5 for each skill', () => {
    for (const skill of profile.skills) {
      expect(skill.proficiency).toBeGreaterThanOrEqual(1);
      expect(skill.proficiency).toBeLessThanOrEqual(5);
    }
  });
});
