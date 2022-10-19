import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

import info from "../export.json"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  const getType = id => {
    return info.entries.find(item => item.sys?.id === id)?.sys.contentType?.sys
      ?.id
  }

  const pressReleasesPages = info.entries.filter(item => {
    const type = getType(item.fields?.content?.["en-US"]?.sys?.id)

    return (
      item.sys?.contentType?.sys?.id === "page" && type === "pagePressRelease"
    )
  })

  const final = pressReleasesPages.map(cp => {
    const seo = info.entries.find(
      i => i.sys?.id === cp.fields?.seo?.["en-US"]?.sys?.id
    )

    const prp = info.entries.find(
      i => i.sys?.id === cp.fields?.content?.["en-US"]?.sys?.id
    )

    const tpr = info.entries.find(
      i => i.sys?.id === prp.fields?.pressRelease?.["en-US"]?.sys?.id
    )

    return {
      sys: {
        space: {
          sys: {
            type: "Link",
            linkType: "Space",
            id: "lbgy40h4xfb7",
          },
        },
        type: "Entry",
        contentType: {
          sys: {
            type: "Link",
            linkType: "ContentType",
            id: "pressRelease",
          },
        },
      },
      fields: {
        name: tpr.fields.headline,
        slug: cp.fields.slug,
        location: tpr.fields.location,
        date: tpr.fields.releaseDate,
        summary: tpr.fields.summary,
        content: tpr.fields.content,
        metaTitle: seo.fields.title,
        metaDescription: seo.fields.description,
        metaNoIndex: seo.fields.no_index
          ? { "en-US": false }
          : { "en-US": true },
        metaNoFollow: seo.fields.no_follow
          ? { "en-US": false }
          : { "en-US": true },
      },
    }
  })

  console.log(JSON.stringify(final))

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
