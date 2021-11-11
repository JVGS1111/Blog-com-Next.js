import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

import { FiUser } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import { FiClock } from "react-icons/fi";

FiClock
interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}
// {formatDate(post.first_publication_date)}
export default function Post() {
  return (
    <main >
      <div className={styles.banner}>
        <img src="" alt="" />
      </div>
      <article className={`${commonStyles.container} ${styles.content}`}>
        <h1>titulo</h1>
        <div className={commonStyles.postInfo}>
          <time><FiCalendar size={20} /> 15 mar 2021</time>
          <span><FiUser size={20} /> guerber</span>
          <span><FiClock size={20} />4 min</span>
        </div>
        <h2>titulo da sessao</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          <br />
          <br />
          Nullam dolor sapien, vulputate eu diam at, condimentum hendrerit tellus. Nam facilisis sodales felis, pharetra pharetra lectus auctor sed.
          <br />
          <br />
          Ut venenatis mauris vel libero pretium, et pretium ligula faucibus. Morbi nibh felis, elementum a posuere et, vulputate et erat. Nam venenatis.
        </p>
      </article>
    </main>
  )
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query(TODO);

//   // TODO
    // fazer requisiçao dos dois ultimos posts
// };

// export const getStaticProps = async context => {
//   const prismic = getPrismicClient();
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
