# contact-manager

This is a simple standalone contact manager application that allows users to add, edit, delete and view contacts. The application is built using Angular 16.2.12. 

You can import contacts from a CSV file, manipulate them within the application and export contacts to a CSV, CVF, JSON or SQL file.

## CSV File Format

The CSV file should have the following format:

```csv
First Name,Last Name,Phone,Email,Birthday
...
```

NB: The birthday should be in the iso 8601 date format (`YYYY-MM-DD`).

## Run

To run the application, clone the repository and run the following commands:

```bash
npm install
npm start
```
