import * as React from "react"
import { Helmet } from "react-helmet"
import Buses from "../components/buses"

import Layout from "../components/layout"

export default function IndexPage() {
  return (
    <Layout>
      <section>
        <Helmet>
          <meta charSet="utf-8" />
          <title>CTA Panel</title>
        </Helmet>
        <table className="table table-dark table-responsive">
          {process.env.GATSBY_BUS_STOPS && JSON.parse(process.env.GATSBY_BUS_STOPS).map((route) =>
            <Buses key={route.routeLabel} info={route} />
          )}
        </table>
      </section>
    </Layout>
  )
}
