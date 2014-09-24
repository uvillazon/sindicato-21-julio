using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sindicato.Common;
using Sindicato.Model;
using Sindicato.Services.Model;
using System.Linq.Expressions;

namespace Sindicato.Services.Interfaces
{
    public interface IImagenesServices
    {
        IEnumerable<SD_IMAGENES> ObtenerImagenesPaginado(PagingInfo paginacion, FiltrosModel<ImagenesModel> filtros);
        SD_IMAGENES BuscarImagen(Expression<Func<SD_IMAGENES, bool>> criterio);
        RespuestaSP GuarbarImagen(SD_IMAGENES img, int ID_USR);

        //SD_USUARIOS
    }
}
