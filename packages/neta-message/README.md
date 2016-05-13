# neta-message
> Encode and decode Neta messages.

## API
### `encode(type, body, [id])`
 - `type` (`String`, `Number`): The type of the message you are sending.
 - `body`: The body of the message.
 - `id` (`Buffer`): An alternative UUID to use for the message.

Returns a `Buffer` representing a Neta message of the input, returns `null` the input is invalid.

### `decode(buf)`
 - `buf` (`Buffer`): The message to decode.

Returns an object with `id`, `type`, and `body`, returns `null` if message is invalid.

### `resolveType(type)`
 - `type` (`String`, `Number`): Resolve the type given a number or name.

Returns an array containing name and the number (like `['info', 1]`), returns `null` if type is invalid.
