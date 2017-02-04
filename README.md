# PocketBlog

A minimal, database-less blog app. 

The core goals of this project is to write a simple web application that is easy for developers to understand and use. It will always be simple. Some features include:

* Blog posts are stored as Markdown-formatted files in the `posts` folder, and adding new files to this folder also adds them to the blog
* The blog is skinned using *twig* templates

## More about blog posts

* The post files must have the file extension `.md`
* They should include some minimal metadata enclosed in lines that start with `---`. See example below.

## Example blog post file
```markdown
---
Title: Example
Description: Some descriptive text
Author: Author K. Authorson
Date: 4th of May, 2020
---
# Blog Post Title

This is a minimal markdown example
```

## How the metadata is used

The `Title` value is used as the page title. The values for `Author` and `Date` are used to create a byline such as "Written on the 4th of May, 2020 by Author K. Authorson". The description is currently not used for anything.

## Basic setup

1. Clone repo
2. Install composer (if not already installed)
3. Run `composer install` in the project root folder
4. Add the contents of `pocketblog.conf` to your Apache2 configuration

## TODO

- Functionality for listing available articles
- Go through code and standardize coding style
