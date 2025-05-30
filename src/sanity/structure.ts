import type { StructureResolver } from 'sanity/structure'
import { DocumentTextIcon, TagIcon, UserIcon, ImageIcon, FolderIcon } from '@sanity/icons'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content Management')
    .items([
      // Blog Posts Section
      S.listItem()
        .title('Blog Posts')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Blog Posts')
            .items([
              S.listItem()
                .title('All Posts')
                .child(
                  S.documentTypeList('post')
                    .title('All Posts')
                    .defaultOrdering([
                      { field: 'publishedAt', direction: 'desc' },
                      { field: '_createdAt', direction: 'desc' }
                    ])
                ),
              S.listItem()
                .title('Published Posts')
                .child(
                  S.documentTypeList('post')
                    .title('Published Posts')
                    .filter('_type == "post" && status == "published"')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('Draft Posts')
                .child(
                  S.documentTypeList('post')
                    .title('Draft Posts')
                    .filter('_type == "post" && status == "draft"')
                    .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('Featured Posts')
                .child(
                  S.documentTypeList('post')
                    .title('Featured Posts')
                    .filter('_type == "post" && featured == true')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                ),
            ])
        ),

      S.divider(),

      // Content Management Section
      S.listItem()
        .title('Content Management')
        .icon(FolderIcon)
        .child(
          S.list()
            .title('Content Management')
            .items([
              S.listItem()
                .title('Categories')
                .icon(TagIcon)
                .child(
                  S.documentTypeList('category')
                    .title('Categories')
                    .defaultOrdering([
                      { field: 'order', direction: 'asc' },
                      { field: 'title.en', direction: 'asc' }
                    ])
                ),
              S.listItem()
                .title('Authors')
                .icon(UserIcon)
                .child(
                  S.documentTypeList('author')
                    .title('Authors')
                    .defaultOrdering([{ field: 'name', direction: 'asc' }])
                ),
              S.listItem()
                .title('Content Images')
                .icon(ImageIcon)
                .child(
                  S.documentTypeList('contentImage')
                    .title('Content Images')
                    .defaultOrdering([
                      { field: '_createdAt', direction: 'desc' },
                      { field: 'title', direction: 'asc' }
                    ])
                ),
            ])
        ),

      S.divider(),

      // Quick Actions
      S.listItem()
        .title('📝 Create New Post')
        .child(
          S.editor()
            .schemaType('post')
            .documentId('new-post')
        ),

      S.listItem()
        .title('🖼️ Upload Content Image')
        .child(
          S.editor()
            .schemaType('contentImage')
            .documentId('new-content-image')
        ),

      S.divider(),

      // Other document types (if any)
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['post', 'category', 'author', 'contentImage'].includes(item.getId()!),
      ),
    ])
