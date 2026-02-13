-- Add default area/address column to workers table.
-- Run in MySQL (easyghar) if not already applied.

USE easyghar;

ALTER TABLE workers
ADD COLUMN default_address TEXT NULL AFTER city_id,
ADD INDEX idx_default_address (default_address(100));
