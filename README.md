# PocketBlog

A minimal, database-less blog app. 

The core goals of this project is to write a simple Node.js application that is easy for developers to understand and use. It will always be simple. Some features include:

* Articles are stored as Markdown-formatted files in the `articles` folder, and adding new files to this folder also adds them to the blog
* Users with edit privileges are stored in admins.json
* The blog is skinned using *Handlebars* templates

## More about articles

* Articles are synonymous with blog entries
* The `articles` folder is monitored such that adding, changing or removing a file will automatically update the blog
* The article files must have the file extension `.md`
* Articles are indexed in-memory, so a request will not lead to articles being read from file

# Basic setup

1. Clone repo
2. Create admins.json in the root directory. It contains user accounts that are admins. Example:

    ```
    {
        "users": [
            {"name": "Peder", "password": "Kake55"}
        ]
    }
    ```

3. Create config.json in the root directory. It contains the locations of your article files and images (images used in the articles). Example:

    ```
    {
        "imageSource": "C:/Users/PederVoldnes/blog/images",
        "articleSource": "C:/Users/PederVoldnes/blog/articles"
    }
    ```

4. `npm install`
5. `gulp`
6. `npm start`