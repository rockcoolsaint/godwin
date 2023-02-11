from django.utils.html import strip_tags
from django.core import mail


def send_rigly_emails(subject, to_email: list, text_message=None, html_message=None):
    # html_message = render_to_string(path + 'admin-new-request.html',
    #                                 {'name': first_name, 'email': email, 'items': items, 'order_id': order_id})
    plain_message = strip_tags(html_message)
    from_email = 'Rigly Web App <kgoyal00000@gmail.com>'

    mail.send_mail(subject, plain_message, from_email, to_email,
                   html_message=html_message)


# this function returns minimum bid required to place a user's bid
def minbid(min_bid, present_bid):
    bid_obj = None
    for bids_list in present_bid:
        if min_bid < int(bids_list.bid):
            bid_obj = bids_list
            min_bid = int(bids_list.bid)
    return min_bid, bid_obj
