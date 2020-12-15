// import { useEffect, useState } from 'react';
// import network from '../modules/network';
// import axios from 'axios';

// export default function useSearch(query) {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [results, setResults] = useState([]);

//   useEffect(() => {
//     setResults([]);
//   }, [query]);

//   useEffect(() => {
//     setLoading(true);
//     setError(false);
//     let cancel;
//     network({
//       method: 'GET',
//       url: `/api/search?filter=${query}`,
//       cancelToken: new axios.CancelToken((c) => (cancel = c)),
//     })
//       .then((res) => {
//         //@ts-ignore
//         setResults(() => {
//           return res.data;
//         });
//       })
//       .catch((e) => {
//         if (axios.isCancel(e)) return;
//         setError(true);
//       });
//     return () => cancel();
//   }, [query]);

//   return { loading, error, results };
// }

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useSearch(query) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [results, setResults] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setResults([]);
  }, [query]);

  useEffect(() => {
    if (query !== '') {
      setLoading(true);
      setError(false);
      let cancel;
      axios({
        method: 'GET',
        url: `/api/search?filter=${query}`,
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
        headers: {
          ['Authorization']: 'bearer ' + localStorage.getItem('token'),
        },
      })
        .then((res) => {
          //@ts-ignore
          setResults(() => {
            return res.data;
          });
          setHasMore(res.data.length > 0);
          setLoading(false);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
          setError(true);
        });
      return () => cancel();
    }
  }, [query]);

  return { loading, error, results, hasMore };
}
