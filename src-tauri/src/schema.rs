// Defines the table schema for the database

pub const SQL_DBNAME: &str = "data.db";

pub const SQL_SCHEMA: &str = "

    PRAGMA FOREIGN_KEYS=ON;

    CREATE TABLE IF NOT EXISTS format (
        extension TEXT PRIMARY KEY
    );

    CREATE TABLE IF NOT EXISTS render (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        image_data BLOB,
        configuration TEXT,
        extension TEXT,
        FOREIGN KEY (extension)
            REFERENCES format(extension)
                ON DELETE CASCADE
                ON UPDATE CASCADE
    );
";
