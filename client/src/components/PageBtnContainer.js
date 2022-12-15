import React from 'react'
import { useGlobalContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/PageBtnContainer';
import {HiChevronDoubleLeft, HiChevronDoubleRight} from 'react-icons/hi'

export const PageBtnContainer = () => {
    const {numOfPages, page, changePage} = useGlobalContext();

    const pages = Array.from({length: numOfPages}, (_, index) => {
        return index + 1;
    })

    const nextPage = () => {
        let nextPage = page + 1;

        if(nextPage > numOfPages){
            nextPage = 1
        }

        changePage(nextPage)
        
    } 

    const prevPage = () => {
        let prevPage = page - 1;

        if(prevPage < 1){
            prevPage = numOfPages;
        }

        changePage(prevPage)
    }

    console.log(pages)
  return (
    <Wrapper>
        <button className="prev-btn" onClick={prevPage}>
            <HiChevronDoubleLeft/>
            Prev
        </button>

        <div className="btn-container">
            {pages.map((item) => {
                return <button key={item} 
                type='button' className={item === page ? 'pageBtn active' : 'pageBtn'}
                onClick={() => changePage(item)}>
                    {item}
                </button>
            })} 
        </div>

        <button className="prev-btn" onClick={nextPage}>
            <HiChevronDoubleRight/>
            Next
        </button>
    </Wrapper>
  )
}
