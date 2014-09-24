using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sindicato.Common;
using Sindicato.Model;
using Sindicato.Services.Model;

namespace Sindicato.Services.Interfaces
{
    public interface IListasServices
    {
        DataPaged<SD_LISTAS> ObtenerListas(PagingInfo info ,FiltrosModel<SD_LISTAS> filtros);
        IEnumerable<SD_LISTAS_ITEMS> ObtenerListasItems(PagingInfo paginacion, FiltrosModel<ListasItemsModel> filtros);
        IEnumerable<SD_LISTAS> ObtenerTodasListas();
        DataPaged<SD_LISTAS_ITEMS> ObtenerListasItem(PagingInfo info ,FiltrosModel<SD_LISTAS> filtros);
        RespuestaSP SP_GrabarLista(SD_LISTAS lista);
        RespuestaSP SP_GrabarListaItem(SD_LISTAS_ITEMS listaItems, string login);

    }
}
