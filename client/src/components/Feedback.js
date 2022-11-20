import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions';
import { currentProduct } from "../redux/selectors";
import { MenuDetail } from '../pages/Menu/MenuDetail';
import { createOrUpdateVote, createComment, getSelfVoteById } from '../api';

export const Feedback = () => {

    const {id} = useParams()
    const dispatch = useDispatch();
    const product = useSelector(currentProduct);
    const navigate = useNavigate();
    const [data, setData] = useState({
        product_id: id,
        content: ''
    })
    const [star, setStar] = useState(null)
    const starBar = []
    
    for (let i = 1; i <= 5 ; i++) {
        if (i<= star) {
            starBar.push(
                <div className='star voted-star unvoted' key={i} onClick={()=>{voted(i)}}></div>
            )
        } else {
            starBar.push(
                <div className='star unvoted' key={i} onClick={()=>{voted(i)}}></div>
            )
        }
    }
    
    getSelfVoteById(id).then(data => {
        const star = data.data.vote.star
        setStar(star)
    }).catch(err => {
        console.log(err)
    })

    useEffect(() => {
        dispatch(actions.getOneProduct.getOneProductRequest(id));
    }, [id]);

    
    const voted = (n) => {
        var star = document.getElementsByClassName("star")

        for(let i = 5; i<n+5; i++){
            star[i].classList.add("voted-star")
        }
        for(let i = n+5; i<10; i++){
            star[i].classList.remove("voted-star")
        }

        createOrUpdateVote(id, {star: n})

        setTimeout(()=>{
            window.alert(`Thanks for voting for ${product.name} dishes`)
        }, 100)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        createComment(id, data).then(data => {
          navigate(-1);
        }).catch(err => {
          console.log(err)
        })
      };
      
  return (
    <>
        <h1 className="">Feedback about the <span className='text-primary'>{product?.name} dishes</span></h1>
        <div className='row mt-4'>
            {
                id && 
                <MenuDetail
                    _id={product?._id}
                    photo_url={product?.photo_url}
                    name={product?.name}
                    price={product?.price}
                    description={product?.description}
                    quantity={product?.quantity}
                />
            }
            
            <div className='col-md-12 mt-4'>
                <h5>Leave your vote rate here</h5>
                <div className='d-flex align-item-center justify-content-center'>
                    {starBar}
                </div>
            </div>
            <div className='col-md-12 mt-4'>
                <form onSubmit={onSubmit}>
                    <div className="form-floating">
                        <textarea
                            className="form-control"
                            placeholder="Leave a message here"
                            id="comment"
                            style={{ minHeight: "150px" }}
                            onChange={(e) => setData({ ...data, content: e.target.value })}
                        ></textarea>
                        <label htmlFor="comment">Please leave your comment here</label>
                    </div>
                    <div className="mt-3">
                        <button className="btn btn-primary w-30 py-3" type="submit">
                            Comment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}
