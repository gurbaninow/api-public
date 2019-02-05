import { Lines } from '@shabados/database'

/**
 * Get all the lines on a page for a source.
 * @param {number} sourceId The ID of the source to use.
 * @param {number} page The page in the source to retrieve all lines from.
 */
const getLinesOnPage = ( sourceId, page ) => Lines
  .query()
  .join( 'shabads', 'shabads.id', 'lines.shabad_id' )
  .eager( 'shabad.[section, subsection]' )
  .where( 'source_page', page )
  .andWhere( 'shabads.source_id', sourceId )
  .orderBy( 'order_id' )

export default getLinesOnPage
