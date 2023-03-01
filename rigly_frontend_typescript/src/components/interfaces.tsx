export interface RendererProps {
    "days"?: string | number,
    "hours"?: string | number, 
    "minutes"?: string | number, 
    "seconds"?: string | number, 
    "completed"?: boolean | number
};


export interface HomePageProps{
    "title": string,
    "description": string,
    "image_file": string,
    "products": productProps[],
    "mining_info_image_1": string,
    "mining_info_title_1":string,
    "mining_info_description_1": string,
    "mining_info_url_1": string,

    "mining_info_image_2": string,
    "mining_info_title_2":string,
    "mining_info_description_2": string,
    "mining_info_url_2": string,

    "mining_info_image_3": string,
    "mining_info_title_3":string,
    "mining_info_description_3": string,
    "mining_info_url_3": string,
    "about_us_1_image": string,
    "about_us_1_title":string,
    "about_us_1_sub_title": string,
    "about_us_1_url": string,

    "about_us_2_image": string,
    "about_us_2_title":string,
    "about_us_2_sub_title": string,
    "about_us_2_url": string,

    "about_us_3_image": string,
    "about_us_3_title":string,
    "about_us_3_sub_title": string,
    "about_us_3_url": string,
  }

export interface productProfileProps {
    data:{
        "auction_meta": productMetaProps,
        "auction_type": string,
        "bid_count": number | string,
        "id"?: number | string,
        "created_at": string,
        "current_bid"?: number | string,
        "updated_at": string,
        "deleted": boolean,
        "version": string,
        "title": string,
        "sub_title": string,

        "description": string,
        "starting_bid":  number,
        "auction_start_date": string,
        "expiry_at": string,
        "is_expired": boolean,
        "proxy_increement": number,
        "payment_address": string,
        "payment_address_qr": string,

        "is_auction_active": boolean,
        "auction_status": string,
        "slug_category": string,
        "user": number | string,
        "category": number | string,
        "key"?: number | string
    },
    currentBid?:  number
    
  };

export interface productMetaProps{
    "id": number | string,
    "profile_image_1": string,
    "profile_image_2": string,
    "profile_image_3": string,
    "site_photo": string,
    "live_feed_image": string,
    "hash_price_image": string,
    "power_source": string,
    "asic_model": string,
    "terms_link": string,
    "hashrate": string,
    "location": string,
    "current_hash_price": string,
    "days_of_mining": string,
    "hours_per_day": string

}

export interface proxyBid{
    "maximum_amount": number,
    "user": userProps
}

export interface productProps {
    "auction_meta": productMetaProps,
    "auction_type": string,
    "bid_count": number | string,
    "id"?: number | string,
    "created_at": string,
    "current_bid"?: number | string,
    "updated_at": string,
    "deleted": boolean,
    "version": string,
    "title": string,
    "sub_title": string,

    "description": string,
    "starting_bid":  number,
    "auction_start_date": string,
    "expiry_at": string,
    "is_expired": boolean,
    "proxy_increement": number,
    "payment_address": string,
    "payment_address_qr": string,

    "is_auction_active": boolean,
    "auction_status": string,
    "slug_category": string,
    "user": number | string,
    "category": number | string,
    "key"?: number | string
  };

export interface userProps{
    "id"?: number | string,
    "first_name"?: string,
    "email"?: string,
    "bidding_name": string,
    "username"?: string,
    "last_name"?: string,
    "is_paid"?: boolean | string,
    "is_coupon_used"?: boolean,
    "coupon"?: string | string | number,
    "date_joined": string,
    "profile_pik"?: string,
    "uploaded_profile": string,
    "phone_number"?: string | number,
    "address"?: string,
    "key"?: string | number,
    "newsletter_subscribe": boolean,
    "telegram_username": string,
    "mining_pool_stratum_address": string,
    "mining_pool_username": string,
    "refer_code": string,
    "referral_code": string
}

export interface auctionListHistory{
    "id": number | string,
    "user_auction_status": string,
    "created_at": string,
    "updated_at": string,
    "deleted": boolean,
    "version": string,
    "title": string,
    "sub_title": string,
    "description": string,
    "starting_bid": number,
    "auction_start_date": string,
    "expiry_at": string,
    "is_expired": boolean,
    "proxy_increement": number,
    "is_auction_active": boolean,
    "auction_status": string,
    "slug_category": string,
    "payment_address": string,
    "payment_address_qr": string,
    "user": number | string,
    "category": number | string,
    "auction_type": number | string,
    "auction_meta": productMetaProps
}
export interface userHistory{
    "id": number | string,
    "auction_list": auctionListHistory,
    "created_at": string,
    "updated_at": string,
    "deleted": boolean,
    "version": string,
    "bid": number,
    "user": string | number
}


export interface bidProps{
    "id": number | string,
    "user": userProps,
    "created_at": string | Date,
    "updated_at": string | Date,
    "deleted"?: boolean | string,
    "version"?: string,
    "bid": number,
    "auction_list": string | number,
    "key"?: string | number
}

export interface StringProps{
    data: string
}

export interface collectionProps{
    "count": number,
    "next": string,
    "previous": string,
    "results": productProps[]
}


export interface winnerProps{
    "id": number | string,
    "user": userProps,
    "created_at": string,
    "updated_at": string,
    "deleted": boolean,
    "version": string,
    "position": number,
    "bid_price": number,
    "is_winner": boolean,
    "auction": string | number
}