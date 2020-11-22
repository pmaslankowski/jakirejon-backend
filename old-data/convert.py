# Script transforming data from old DistrictFinder xml format to single json
# file that can be inserted to elasticsearch

import glob
import json
from xml.dom import minidom

HOSPITALS_PATH = 'hospitals.xml'
DISTRICTS_PATH = 'districts'
OUTPUT_PATH = 'streets.json'


def parse_hospitals(filename):
    def get_value(hospital, key):
        return hospital.getElementsByTagName(key)[0].firstChild.nodeValue

    doc = minidom.parse(filename)
    hospitals = doc.getElementsByTagName('hospital')

    ids2hospitals = {}
    for hospital in hospitals:
        id = get_value(hospital, 'id')
        name = get_value(hospital, 'name')
        address = get_value(hospital, 'address')
        phone = get_value(hospital, 'phone')

        ids2hospitals[id] = {
            'name': name,
            'address': address,
            'phone': phone
        }

    return ids2hospitals


def parse_district(filename, hospitals):
    doc = minidom.parse(filename)
    district = doc.getElementsByTagName('district')[0]

    district_name = district.attributes['label'].value

    hospital_node = district.getElementsByTagName('hospital')[0]
    hospital_label = hospital_node.firstChild.nodeValue
    hospital = hospitals[hospital_label]

    result = []
    streets = district.getElementsByTagName('street')
    for street in streets:
        street_name = street.firstChild.nodeValue
        apartments = None
        if 'odd-start' in street.attributes and 'odd-end' in street.attributes:
            odd_start = int(street.attributes['odd-start'].value)
            odd_end = int(street.attributes['odd-end'].value)
            apartments = list(range(odd_start, odd_end+2, 2))
        if 'even-start' in street.attributes \
                and 'even-end' in street.attributes:
            if not apartments:
                apartments = []
            even_start = int(street.attributes['even-start'].value)
            even_end = int(street.attributes['even-end'].value)
            apartments += list(range(even_start, even_end+2, 2))
        if 'start' in street.attributes and 'end' in street.attributes:
            if not apartments:
                apartments = []
            start = int(street.attributes['start'].value)
            end = int(street.attributes['end'].value)
            apartments += list(range(start, end+1))
        if 'additional' in street.attributes:
            if not apartments:
                apartments = []
            additional = [
                int(x) for x 
                in street.attributes['additional'].value.split(',')
            ]
            apartments += additional

        processed_street = {
            'street': street_name,
            'district': district_name,
            'hospital': hospital,
            'apartments': apartments
        }

        result.append(processed_street)

    return result


if __name__ == '__main__':
    hospitals = parse_hospitals(HOSPITALS_PATH)

    result = []
    for filename in glob.glob(f'{DISTRICTS_PATH}/*.xml'):
        result += parse_district(filename, hospitals)

    print(f'Loaded {len(result)} streets')
    print('Top 5:')
    print(json.dumps(result[:5], indent=2, ensure_ascii=False))

    print(f'Saving to {OUTPUT_PATH}...')
    with open(OUTPUT_PATH, 'w+') as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print('Done')
