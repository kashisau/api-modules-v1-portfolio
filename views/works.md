# Works Method
## API Server

This method provides access to a list of portfolio items along with detailed portfolio information for items contained.

## Methods

## `GET` works [AccessLevel 1]

Retrieves a list of work items.

### Required attributes

There are no mandatory parametres required to list the work items, however a valid authentication token with access level 1+ must be supplied.

| Attribute | Value(s)             | Description                                                                                                                              |
| --------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| apiKey    | `<your API key>`     | The API key that has been issued to identify an individual account  holder. This is merely used to identify the user of the api service. |


### Optional attributes

Additional attributes may be supplied to modify the resulting list of portfolio works. These selectors may be stacked in order of preference. For example, if the desired list should be sorted by type then by date added the following parameter may be added to the query string: `...works.json?sortBy=type,-added&...`.

| Property  | Value(s)                                     |Description                                                             |
| ----------|----------------------------------------------|------------------------------------------------------------------------|
| sortBy    | `[-]added`&#124;`[-]delivered`&#124;`[-]type`&#124;`[-]awarded` | The criterion by which to sort the results retrieved. Default `+added`. |
