/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import { Box } from '@xstyled/styled-components'
import Helmet from 'react-helmet'
import { HomeHero, ShowCase, BaseLayout } from 'smooth-doc/components'

export default function Index() {
  return (
    <BaseLayout>
      <Helmet>
        <title>Loadable Components - React code splitting</title>
      </Helmet>

      <HomeHero title="React code splitting made easy." />

      <ShowCase>
        <Box maxWidth={660} px={20}>
          <Box row>
            <Box col={{ xs: 1, md: true }}>
              <h2>What is it?</h2>
              <ul>
                <li>A React code splitting library</li>
                <li>Not an alternative to React.lazy</li>
                <li>
                  A solution{' '}
                  <a
                    href="https://reactjs.org/docs/code-splitting.html#reactlazy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    recommended by React Team
                  </a>
                </li>
              </ul>
            </Box>
            <Box col={{ xs: 1, md: 'auto' }}>
              <h2>Features</h2>
              <ul>
                <li>📚 Library splitting</li>
                <li>⚡️ Prefetching</li>
                <li>💫 Server Side Rendering</li>
                <li>🎛 Full dynamic import</li>
              </ul>
            </Box>
          </Box>
        </Box>
      </ShowCase>
    </BaseLayout>
  )
}
