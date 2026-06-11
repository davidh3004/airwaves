-- Run after schema.sql to confirm setup
select table_name
from information_schema.tables
where table_schema = 'public'
  and table_name in ('site_settings', 'quote_submissions')
order by table_name;

select count(*) as site_settings_rows from site_settings;
select count(*) as quote_submissions_rows from quote_submissions;
