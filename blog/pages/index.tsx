import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts, getSampleData } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Post from '../interfaces/post'
import { useEffect, useState } from 'react'

type Props = {
  allPosts: Post[],
  todos: any
}

export default function Index({ allPosts }: Props) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)

  // ↓↓↓ client-side-rendering ↓↓↓
  const [todos, setTodos] = useState([]);
  useEffect(() =>{
    const fetchTodos = async() => {
      setTimeout(
        async () => {
        const res = await fetch('/api/todos');
        const data = await res.json();
        console.log(data);
        setTodos(data);  
        }
        , 2000);
    }

    fetchTodos();
  }, []);
  // ↑↑↑ client-side-rendering ↑↑↑

  return (
    <>
      <Layout>
        {/* TODOリストを表示 */}
        {todos?.length === 0 ? (
          <div>loading...</div>
        ) : (
          todos?.map(todo => (
            <div key={todo.id}>
              <p>
                {todo.id}: {todo.title}
              </p>
            </div>
          ))
        )}
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
