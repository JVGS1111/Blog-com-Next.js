

export function getMorePosts(url) {

    const promise = fetch(url, { method: 'GET' })
        .then(res => { return res.json() })
        .then(res => {
            const posts = res.results.map(post => {
                return {
                    uid: post.uid,
                    first_publication_date: post.first_publication_date,
                    data: {
                        title: post.data.title,
                        subtitle: post.data.subtitle,
                        author: post.data.author
                    }
                }
            })

            return { results: [...posts], next_page: res.next_page }

        })

    return Promise.resolve(promise)
}