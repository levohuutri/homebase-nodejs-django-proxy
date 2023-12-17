#########################
# This a copy version of /apps/django/app/proxy/helpers.py
#########################
import requests
from django.http import HttpResponse, HttpRequest
from app import settings;

def request_proxy(request: HttpRequest, path: str) -> HttpResponse:
    target_url = get_proxy_url(path)
    params = request.GET.copy()
    headers = extract_headers(request.META)
    
    args = {
        'headers': headers,
        'params': params,
        'data': request.body
    }

    proxy_response = generate_proxy_response(request.method, target_url, args)
    return proxy_response

# Create proxy url from path
def get_proxy_url(path: str) -> str:
    return f"{settings.EXPRESS_BASEURL}/{path}"

# Convert request meta to valid headers
def extract_headers(request_meta: dict[str, any])->dict[str, any]:
    headers = {}
    # Fix can not forward request.POST.body
    for key, value in request_meta.items():
        if key.startswith('HTTP_') and key != 'HTTP_HOST':
            headers[key[5:].replace('_', '-')] = value
        elif key in ('CONTENT_TYPE', 'CONTENT_LENGTH'):
            headers[key.replace('_', '-')] = value

    for key in list(headers.keys()):
        if key.lower() == 'content-length':
            del headers[key]

    return headers

# Check headers with hop-by-hop
def generate_proxy_response(method: str, target_url: str, args: dict[str, any])->HttpResponse:
    response = requests.request(method, target_url, **args)

    proxy_response = HttpResponse(
        response.content,
        status=response.status_code)

    excluded_headers = set([
        # Hop-by-hop denied
        'connection', 'keep-alive', 'proxy-authenticate', 'proxy-authorization', 'te', 'trailers', 'transfer-encoding',
        'upgrade', 'content-encoding', 'content-length',
    ])

    for key, value in response.headers.items():
        if key.lower() in excluded_headers:
            continue
        else:
            proxy_response[key] = value

    return proxy_response