# Lost and Found

Lost and Found is a platform for all to post someone's belongings and check on lost items

## Installation

You need to have both Cloudinary and Mapbox (need a credit card) accounts.

### Server

Make sure you have PostgreSQL installed.

```sh
npm install
npm migrate
```

.env file for the server
```
PORT=8000
DB_URL_LOCAL=
NODE_ENV=development
```

### Client

```sh
npm install
```


.env file for the client
```
REACT_APP_MAPBOX_ACCESS_TOKEN=
REACT_APP_API_URL=http://localhost:8000
REACT_APP_API_CLOUDINARY_NAME=
REACT_APP_API_CLOUDINARY_API=
REACT_APP_API_CLOUDINARY_SECRET=
REACT_APP_API_CLOUDINARY_URL=
REACT_APP_API_CLOUDINARY_PRESET=
REACT_APP_API_CLOUDINARY_FOLDER=
```

## Usage

Run the command below from the root folder
```sh
npm run concurrent

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
