import { GetStaticProps } from 'next';
import { useState } from 'react';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

import Prismic from '@prismicio/client';
import { getPrismicClient } from '../services/prismic';

import { FiUser } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";

import { getMorePosts } from '../services/getMorePosts';


import Link from "next/link"
import { formatDate } from '../util/formatDate';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string | null;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  const { results, next_page } = postsPagination;

  const [nextPage, setNextPage] = useState(next_page)
  const [posts, setPosts] = useState<Post[]>(results)


  async function setNewPosts() {
    if (!nextPage) {
      return
    }
    const res: PostPagination = await getMorePosts(nextPage)
    const newPosts = res.results;

    setPosts([...posts, ...newPosts])
    setNextPage(res.next_page)

  }



  if (!nextPage) {
    return (
      <main className={`${commonStyles.container} ${styles.postList}`}>

        {
          posts.map(post => (
            <Link href={`post/${post.uid}`}>
              <div key={post.uid} className={styles.post}>
                <h2>{post.data.title}</h2>
                <p>{post.data.subtitle}</p>
                <div className={commonStyles.postInfo}>
                  <time><FiCalendar size={20} /> {formatDate(post.first_publication_date)}</time>
                  <span><FiUser size={20} /> {post.data.author}</span>
                </div>
              </div>
            </Link>
          ))
        }

      </main>
    )
  } else {
    return (
      <main className={`${commonStyles.container} ${styles.postList}`}>

        {
          posts.map(post => (
            <Link href={`post/${post.uid}`}>
              <div key={post.uid} className={styles.post}>
                <h2>{post.data.title}</h2>
                <p>{post.data.subtitle}</p>
                <div className={commonStyles.postInfo}>
                  <time><FiCalendar size={20} /> {formatDate(post.first_publication_date)}</time>
                  <span><FiUser size={20} /> {post.data.author}</span>
                </div>
              </div>
            </Link>
          ))
        }

        <span className={styles.loadPosts} onClick={setNewPosts}>Carregar mais posts</span>
      </main>
    )
  }

}

export const getStaticProps: GetStaticProps = async () => {

  const prismic = getPrismicClient();
  const postsResponse = await prismic.query([
    Prismic.predicates.at('document.type', 'post')
  ],
    {
      pageSize: 2,
    }
  );
  console.log(postsResponse);

  const results = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author
      }
    }
  });

  let next_page = postsResponse.next_page
  const postsPagination = { next_page, results }

  return {
    props: { postsPagination }
  }
};


