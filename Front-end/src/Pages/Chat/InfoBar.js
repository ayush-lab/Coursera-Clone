import React from 'react';
import styles from './infobar.module.css';
import GroupIcon from '../../assets/Images/GroupIcon.jpg';

export default function Infobar(props){

    return(
         <div className={styles.infoBar}>
            <div className={styles.infoBar_left}>
                <div><img className={styles.groupIcon} src={GroupIcon} alt="group picture"/></div>
                <div className={styles.infoBar_detail}>
                    <i className={styles.groupName}>{props.CourseName}</i>
                    <i className={styles.name}>{props.users.map((user,index)=>(
                        index === props.users.length-1 ? <i key={index}>{user}</i> : <i key={index}>{user},</i>
                    ))}</i>
                </div>
            </div>
         </div>
          
        )} 