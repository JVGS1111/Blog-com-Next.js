import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';

import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

import { FiUser } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import { FiClock } from "react-icons/fi";

import { RichText } from "prismic-dom"
import { formatDate } from '../../util/formatDate';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface Post {
  uid?: string
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string
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

export default function Post({ post }: PostProps) {

  const router = useRouter()

  function calcReadingTime(textArr) {
    let textLength = 0; //armazena numero de palavras

    textArr.forEach(el => {
      let heading = el.heading.split(' ');
      textLength = + (heading.length + textLength);
      //contagem de quantas palavras tem no titulo

      let body = RichText.asText(el.body)
      let text = body.split(' ');
      textLength = + (text.length + textLength);
      //contagem de quantas palavras tem no paragrafo
    });

    const result = Math.ceil(textLength / 200);
    return result;
  }

  const timeToRead = calcReadingTime(post.data.content)

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>{post.data.title} | spacetraveling</title>
        </Head>
        <main className={styles.loading}>
          <div >Carregando...</div>
        </main>
      </>
    )
  } else {
    return (
      <>
        <Head>
          <title>{post.data.title} | spacetraveling</title>
        </Head>
        <main >
          <div className={styles.banner}>
            <img src={post.data.banner.url} alt="banner" />
          </div>
          <article className={`${commonStyles.container} ${styles.content}`}>
            <h1>{post.data.title}</h1>
            <div className={commonStyles.postInfo}>
              <time><FiCalendar size={20} /> {formatDate(post.first_publication_date)}</time>
              <span><FiUser size={20} /> {post.data.author}</span>
              <span><FiClock size={20} />{timeToRead} min</span>
            </div>
            {
              post.data.content.map(el => {
                let html = RichText.asHtml(el.body);
                return (
                  <div key={post.data.title} className={styles.postContent}>
                    <h2>{el.heading}</h2>
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                  </div>
                )
              })
            }
          </article>
        </main>
      </>
    )
  }

}

export const getStaticPaths: GetStaticPaths = async () => {

  const prismic = getPrismicClient();
  const posts = await prismic.query([
    Prismic.predicates.at('document.type', 'post')
  ],
    {
      pageSize: 2,
    }
  );

  const paths = posts.results.map(post => ({
    params: { slug: post.uid }
  }))

  return {
    paths: paths,
    fallback: true,
  }
  //  faz a requisiçao dos dois ultimos posts
};

export const getStaticProps: GetStaticProps = async context => {

  const { slug } = context.params;
  const prismic = getPrismicClient();
  const response: Post = await prismic.getByUID('post', String(slug), {});

  const post = {
    first_publication_date: response.first_publication_date,
    uid: response.uid,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      banner: {
        url: response.data.banner.url
      },
      author: response.data.author,
      content: response.data.content.map(el => {
        return {
          heading: el.heading,
          body: el.body
        }
      })
    }

  }
  return {
    props: { post }
  }
};
