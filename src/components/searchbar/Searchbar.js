import React, { useState } from 'react'
import { AsyncPaginate } from "react-select-async-paginate"
import { geoApiOptions, GEO_API_URL } from '../../api'

export default function Searchbar({ onSearchChange }) {
    const [search, setSearch] = useState('')

    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}/cities?namePrefix=${inputValue}`,
            geoApiOptions
        ).then(res => res.json())
            .then(result => {
                if (result) {
                    return {
                        options: result.data.map(city => {
                            return {
                                value: `${city.latitude} ${city.longitude}`,
                                label: `${city.name} ${city.countryCode}`
                            }
                        })
                    }
                }

            })
            .catch(err => {
                return {
                    options: []
                }
            })
    }

    const onChangeHandler = (searchData) => {
        setSearch(searchData)
        onSearchChange(searchData)
    }

    return (
        <AsyncPaginate
            placeholder="please enter the name of the city..."
            value={search}
            debounceTimeout={600}
            onChange={onChangeHandler}
            loadOptions={loadOptions}
        />
    )
}
