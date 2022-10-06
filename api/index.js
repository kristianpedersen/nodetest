console.log("Hei!");

import algoliasearch from 'algoliasearch'
import sanityClient from '@sanity/client'
import indexer from 'sanity-algolia'

const algolia = algoliasearch(
    'C26QC41PWH',
    "52b1698a6f2c793b80cfe5a3b0eb5f88"
)
const sanity = sanityClient({
    projectId: 'sukats6f',
    dataset: 'test',
    token: 'read-token',
    apiVersion: '2021-03-25',
    useCdn: false,
})

const handler = (req, res) => {
    console.log({ req })
    console.log({ res })
    if (req.headers['content-type'] !== 'application/json') {
        res.status(400)
        res.json({ message: 'Bad request: ' + req.headers["content-type"] })
        return
    }

    const algoliaIndex = algolia.initIndex('test_index')

    const sanityAlgolia = indexer(
        {
            post: {
                index: algoliaIndex,
            },
            article: {
                index: algoliaIndex,
            },
        },

        (document) => {
            switch (document._type) {
                case 'post':
                    return Object.assign({}, document, {
                        custom: 'An additional custom field for posts, perhaps?',
                    })
                case 'standard-article':
                    return {
                        title: document.heading,
                        body: document.body,
                        authorNames: document.authorNames,
                    }
                default:
                    return document
            }
        },

        (document) => {
            if (document.hasOwnProperty('isHidden')) {
                return !document.isHidden
            }
            return true
        }
    )

    return sanityAlgolia
        .webhookSync(sanity, req.body)
        .then(() => res.status(200).send('ok'))
}

console.log("Snakkes!")

export default handler