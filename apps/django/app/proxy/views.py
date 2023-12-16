
from django.views.decorators.csrf import csrf_exempt
from .helpers import request_proxy

@csrf_exempt
def proxy_view(request, path):
    proxy_response = request_proxy(request=request, path=path)
    return proxy_response