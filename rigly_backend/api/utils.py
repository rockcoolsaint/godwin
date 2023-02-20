from django.utils.html import strip_tags
from django.core import mail


def send_rigly_emails(subject, to_email: list, text_message=None, html_message=None):
    """
    function to send emails
    :param subject:
    :param to_email:
    :param text_message:
    :param html_message:
    :return:
    """
    plain_message = strip_tags(html_message)
    from_email = 'Rigly Web App <kgoyal00000@gmail.com>'

    mail.send_mail(subject, plain_message, from_email, to_email,
                   html_message=html_message)


# this function returns minimum bid required to place a user's bid
def minbid(min_bid, present_bid):
    """
    calculates the minimum required bid
    :param min_bid:
    :param present_bid:
    :return:
    """
    bid_obj = None
    for bids_list in present_bid:
        if min_bid < int(bids_list.bid):
            bid_obj = bids_list
            min_bid = int(bids_list.bid)
    return min_bid, bid_obj
