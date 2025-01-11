'use client';

import { signup } from '@/app/actions/auth';

export default function SignupForm() {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent page reload
      
        // Collect form data
        const formData = new FormData(event.currentTarget);
      
        // Log form data with types
        for (const [key, value] of formData.entries()) {
          console.log(`Key: ${key}, Value: ${value}, Type: ${typeof value}`);
          
          // Check if value is a File
          if (value instanceof File) {
            console.log(`The value for "${key}" is a File.`);
          }
        }
      
        // Call the signup function (or handle further)
        await signup(formData);
      };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="Name" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}
