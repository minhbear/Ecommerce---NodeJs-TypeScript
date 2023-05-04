export interface ProductQuery{
    product_shop: string;
}

export interface ProductDraftQuery extends ProductQuery {
    isDraft: boolean,
}

export interface ProductPublishedQuery extends ProductQuery {
    isPublished: boolean;
}

export interface ProductsFilter {
    isPublished?: boolean;
    product_shop?: string;
    _id?: string | {}
}