using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Sindicato.Common
{
    [DataContract]
    /*
     * Cracion 22 de junio 2012
     * Autor :  Ubaldo Villazon
     * */
    public class DataPaged<T>
    {
        [DataMember]
        public int Total { get; set; }

        [DataMember]
        public int Page { get; set; }

        [DataMember]
        public bool success { get; set; }

        [DataMember]
        public string msg { get; set; }

        [DataMember]
        public IList<T> Rows { get; set; }
       
   }
    /*
     * Cracion 07 de mayo 2013
     * Autor : Ubaldo Villazon
     * Sirve para enviar Datos a Formularios
     *
     * */
    public class DataForm<T>
    {
        [DataMember]
        public bool success { get; set; }

        [DataMember]
        public T data { get; set; }
    }
}