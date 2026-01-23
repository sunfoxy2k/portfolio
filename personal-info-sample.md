# Personal Information Template

Use this template to customize your AI assistant with your personal information. Copy the relevant details and update the system prompt in `src/app/api/chat/route.ts`.

## Basic Information
- **Name**: [Your Full Name]
- **Title**: [Your Professional Title]
- **Location**: [Your City, Country]
- **Email**: [your.email@example.com]
- **Phone**: [Your Phone Number]

## Professional Background
### Current Role
- **Position**: [Current Job Title]
- **Company**: [Current Company Name]
- **Duration**: [Start Date - Present]
- **Key Responsibilities**: 
  - [Responsibility 1]
  - [Responsibility 2]
  - [Responsibility 3]

### Previous Experience
- **Position**: [Previous Job Title]
- **Company**: [Previous Company]
- **Duration**: [Start Date - End Date]
- **Key Achievements**: [Notable achievements]

## Technical Skills
### Programming Languages
- [Language 1] - [Proficiency Level]
- [Language 2] - [Proficiency Level]
- [Language 3] - [Proficiency Level]

### Frameworks & Technologies
- [Framework 1]
- [Framework 2]
- [Technology 1]
- [Technology 2]

### Tools & Platforms
- [Tool 1]
- [Tool 2]
- [Platform 1]

## Education
- **Degree**: [Degree Name]
- **Institution**: [University/College Name]
- **Year**: [Graduation Year]
- **Relevant Coursework**: [If applicable]

## Projects
### Project 1
- **Name**: [Project Name]
- **Description**: [Brief description of what the project does]
- **Technologies Used**: [List of technologies]
- **Key Features**: [Main features or achievements]
- **Links**: [GitHub repo, live demo, etc.]

### Project 2
- **Name**: [Project Name]
- **Description**: [Brief description]
- **Technologies Used**: [Technologies]
- **Key Features**: [Features]
- **Links**: [Links]

## Certifications & Awards
- [Certification/Award Name] - [Issuing Organization] ([Year])
- [Certification/Award Name] - [Issuing Organization] ([Year])

## Interests & Hobbies
- [Interest 1]
- [Interest 2]
- [Interest 3]

## How to Update the AI Assistant

1. Fill out this template with your information
2. Open `src/app/api/chat/route.ts`
3. Update the system prompt with your details:

```typescript
{
  role: "system",
  content: `You are a helpful assistant representing [Your Name], a [Your Title]. 
  
  Background: [Your background summary]
  
  Skills: [Your key skills]
  
  Current Role: [Current position and responsibilities]
  
  Projects: [Brief overview of your projects]
  
  Answer questions about their professional experience, technical skills, projects, 
  and background. Keep responses conversational but professional. If you don't have 
  specific information, politely say so and suggest they can contact directly for more details.`
}
```

4. Save the file and restart your development server