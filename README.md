# Metropolitan Museum of Art API React Single Page Application

This is a Single Page React application that interacts with the Metropolitan Museum of Art API to display information about various artworks. Search functionality has been implemented, allowing users to search for artworks. Pagination through the search results is also supported, with 20 results displayed per page.

## Metropolitan Museum of Art API

We utilize three endpoints from the Metropolitan Museum of Art API:

1. **Objects Endpoint**: Provides a listing of all valid Object IDs available for access.
   - Endpoint URL: `https://collectionapi.metmuseum.org/public/collection/v1/objects`
2. **Object Endpoint**: Retrieves a record for an object, containing all open access data about that object, including its image (if available).
   - Endpoint URL: `https://collectionapi.metmuseum.org/public/collection/v1/objects/[ObjectId]`
3. **Search Endpoint**: Retrieves a listing of all Object IDs for objects that contain the search query within the object’s data.
   - Endpoint URL: `https://collectionapi.metmuseum.org/public/collection/v1/search?q=[SearchQuery]`

## Dependencies

- React
- React Router v6
- Axios
