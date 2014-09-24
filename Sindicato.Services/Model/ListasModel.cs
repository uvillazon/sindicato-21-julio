using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Sindicato.Services.Model
{
    public class ListasModel
    {
        public int? ID_LISTA { get; set; }
        public string LISTA { get; set; }
        public string DESCRIPCION { get; set; }
        public short? TAM_LIMITE { get; set; }
        public string TIPO_VALOR { get; set; }
        public string MAYUS_MINUS { get; set; }
        public string ESTADO { get; set; }
    }
    public class ListasItemsModel
    {
        public int? ID_TABLA { get; set; }
        public int? ID_PADRE { get; set; }
        public int? ID_LISTA { get; set; }
        public string CODIGO { get; set; }
        public string VALOR { get; set; }
        public string ESTADO { get; set; }
    }
}
