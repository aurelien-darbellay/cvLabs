export interface UserRow {
  id: string;
  title: string;
  full_name: string;
  profile_image_url: string | null;
  contact_email: string | null;
  phone: string | null;
  linkedin: string | null;
  github: string | null;
  portfolio_url: string | null;
  created_at: string;
}

export class User {
  constructor(
    public id: string,
    public title: string,
    public fullName: string,
    public profileImageUrl: string | null,
    public contactEmail: string | null,
    public phone: string | null,
    public linkedin: string | null,
    public github: string | null,
    public portfolioUrl: string | null,
    public createdAt: Date
  ) {}

  static fromRow(row: UserRow): User {
    return new User(
      row.id,
      row.title,
      row.full_name,
      row.profile_image_url,
      row.contact_email,
      row.phone,
      row.linkedin,
      row.github,
      row.portfolio_url,
      new Date(row.created_at)
    );
  }
}
