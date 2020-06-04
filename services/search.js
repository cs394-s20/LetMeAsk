import Fuse from 'fuse.js'

const options = {
  // isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  // threshold: 0.6,
  // distance: 100,
  // useExtendedSearch: false,
  keys: [
    "title",
    "author"
  ]
};

const search = (list, pattern) => {
  const FUSE = new Fuse(list, options);
  return FUSE.search(pattern)
}

export default search;