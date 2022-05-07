import urllib.request

busApi = "http://www.ctabustracker.com/bustime/api/v2/"
busKey = os.environ['CTA_BUS_KEY']

def lambda_handler(event, context):
    global busApi, busKey

    response = {}
    contents = ""

    try:
        route = event['queryStringParameters']['route']
        stops = event['queryStringParameters']['stops']

        url = busApi + "getpredictions?key=" + busKey + "&rt=" + route 
        url = url + "&stpid=" + stops + "&format=json"

        with urllib.request.urlopen(url) as response:
            contents = response.read()

    except Exception as e:
        response = {
            'statusCode': 200,
            'body': 'Unable to find results.'
        }

    response = {
        'statusCode': 200,
        'body': contents
    }

    return response
