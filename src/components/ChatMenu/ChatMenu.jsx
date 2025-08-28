import React, { useState } from "react";
import "../../Styles/ChatStyles/Main.css";

export default function ChatMenu({ setModalActive, setModalCreate }) {
  return (
    <div className="menuBar">
      <div className="menu">
        {/* Кнопка группы */}
        <button className="iconBtn" aria-label="Группа">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="20"
            height="20"
          >
            <circle cx="8" cy="8" r="3" strokeWidth="2" />
            <circle cx="16" cy="8" r="3" strokeWidth="2" />
            <path
              d="M2 19v-1c0-2.761 2.686-5 6-5s6 2.239 6 5v1"
              strokeWidth="2"
            />
          </svg>
        </button>

        {/* Кнопка чата */}
        <button
          onClick={() => setModalCreate(true)}
          className="iconBtn"
          aria-label="Чат"
          title="group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="20"
            height="20"
          >
            <path
              d="M4 6h12a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-5l-4 3v-3H7a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z"
              strokeWidth="2"
            />
            <path d="M8 11h8M8 15h5" strokeWidth="2" />
          </svg>
        </button>

        {/* Кнопка настроек */}
        <button
          onClick={() => setModalActive(true)}
          className="iconBtn"
          aria-label="Настройки"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="20"
            height="20"
          >
            <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="2" />
            <circle cx="9" cy="7" r="2" strokeWidth="2" />
            <circle cx="15" cy="12" r="2" strokeWidth="2" />
            <circle cx="7" cy="17" r="2" strokeWidth="2" />
          </svg>
        </button>
      </div>

      {/* Условный рендер */}
    </div>
  );
}
