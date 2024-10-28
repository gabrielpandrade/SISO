import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa'; // Importando ícone de lápis
import styles from '../styles/components/Table.module.css';

function Table({ data, columns, onEditClick }) {
    const rowsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(''); // Estado para a barra de pesquisa
    const maxPageButtons = 5; // Número máximo de botões de página visíveis

    if (!data || !columns) return null;

    // Função para filtrar dados com base na pesquisa
    const filteredData = data.filter(row =>
        columns.some(col =>
            row[col.key]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    // Função para determinar o intervalo de páginas a exibir
    const getPageRange = () => {
        const halfRange = Math.floor(maxPageButtons / 2);
        let startPage = Math.max(1, currentPage - halfRange);
        let endPage = Math.min(totalPages, currentPage + halfRange);

        if (currentPage <= halfRange) {
            endPage = Math.min(totalPages, maxPageButtons);
        } else if (currentPage + halfRange >= totalPages) {
            startPage = Math.max(1, totalPages - maxPageButtons + 1);
        }

        return [...Array(endPage - startPage + 1)].map((_, i) => startPage + i);
    };

    return (
        <div className={styles.tableContainer}>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Pesquisar..."
                    className={styles.searchInput}
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1); // Resetar para a primeira página ao pesquisar
                    }}
                />
            </div>
            <table className={styles.table}>
                <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col.key}>{col.label}</th>
                    ))}
                    <th>Ações</th> {/* Coluna para os ícones de ação */}
                </tr>
                </thead>
                <tbody>
                {currentRows.length > 0 ? (
                    currentRows.map((row) => (
                        <tr key={row.id}>
                            {columns.map((col) => (
                                <td key={col.key}>
                                    {typeof row[col.key] === 'object'
                                        ? JSON.stringify(row[col.key])
                                        : row[col.key]}
                                </td>
                            ))}
                            <td className={styles.editIcon}>
                                <FaEdit
                                    title="Editar"
                                    onClick={() => onEditClick(row.id)}
                                    className={styles.icon}
                                />
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={columns.length + 1} style={{ textAlign: 'center' }}>
                            Nenhum resultado encontrado.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            <div className={styles.pagination}>
                <button
                    className={styles.paginationButton}
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                >
                    Primeira
                </button>
                <button
                    className={styles.paginationButton}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                {getPageRange().map((pageNumber) => (
                    <button
                        key={pageNumber}
                        className={`${styles.paginationButton} ${currentPage === pageNumber ? styles.activePage : ''}`}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}
                <button
                    className={styles.paginationButton}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Próximo
                </button>
                <button
                    className={styles.paginationButton}
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    Última
                </button>
            </div>
        </div>
    );
}

export default Table;
