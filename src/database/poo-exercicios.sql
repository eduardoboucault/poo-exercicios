-- Active: 1682453835681@@127.0.0.1@3306

CREATE TABLE
    videos (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        title TEXT NOT NULL,
        duration REAL DEFAULT (0) NOT NULL,
        created_at TEXT DEFAULT (DATETIME('now')) NOT NULL
    );

INSERT INTO
    videos (id, title, duration)
VALUES (
        'v001',
        'Introdução ao Sratch',
        30.5
    ), (
        'v002',
        'Introdução ao Web Desenvolvimento',
        45.10
    ), (
        'v003',
        'Programação orientada ao objeto',
        20
    );

SELECT * FROM videos 