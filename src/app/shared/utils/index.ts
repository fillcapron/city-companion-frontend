import { Place } from "../interface";

export function setPlaceMarks(place: Place, more = false): any {
  const { name, description, phone } = place;
  const address = place && place.address;
  const fullAddress = address?.street + ' ' + address?.house;
  const latitude = address && address.latitude;
  const longitude = address && address.longitude;

  return {
    geometry: [latitude!, longitude!],
    properties: {
      id: 1,
      balloonContentHeader: name,
      balloonContentBody: description,
      balloonContentFooter: phone ? fullAddress + ', +7' + phone : fullAddress,
      hintContent: name,
    },
    options: {
      preset: more ? 'islands#redCircleIcon' : 'islands#redIcon'
    }
  }
}